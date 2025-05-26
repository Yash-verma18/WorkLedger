// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/TipJar.sol";

contract TipJarTest is Test {
    TipJar public tipJar;
    address public tipper = address(1);
    address public contractOwner;
    receive() external payable {}

    function setUp() public {
        tipJar = new TipJar();
        contractOwner = address(this);

        vm.deal(tipper, 5 ether);
        emit log_named_address("Deployed TipJar with owner", contractOwner);
        emit log_named_address("Funded tipper", tipper);
    }

    function testSendTip() public {
        string memory message = "Nice Dapp!";
        vm.prank(tipper);
        tipJar.sendTip{value: 1 ether}(message);

        emit log("Sent 1 ether tip from tipper");

        TipJar.Tip[] memory tips = tipJar.getAllTips();

        emit log_named_uint("Tips count", tips.length);
        emit log_named_uint("First tip amount", tips[0].amount);
        emit log_named_address("First tip from", tips[0].from);
        emit log_named_string("First tip message", tips[0].message);

        assertEq(tips.length, 1);
        assertEq(tips[0].amount, 1 ether);
        assertEq(tips[0].from, tipper);
        assertEq(tips[0].message, message);
    }

    function testRevertOnEmptyMessage() public {
        vm.prank(tipper);
        vm.expectRevert("Message cannot be empty");
        tipJar.sendTip{value: 1 ether}("");

        emit log("Checked revert on empty message");
    }

    function testRevertOnZeroTip() public {
        vm.prank(tipper);
        vm.expectRevert("Tip must be greater than 0");
        tipJar.sendTip{value: 0}("Yo");

        emit log("Checked revert on 0 ETH tip");
    }

    function testContractBalanceAfterTip() public {
        vm.prank(tipper);
        tipJar.sendTip{value: 2 ether}("Thanks!");

        uint256 balance = tipJar.getContractBalance();
        emit log_named_uint("Contract balance after tip", balance);

        assertEq(balance, 2 ether);
    }

    function testWithdrawTips() public {
        vm.prank(tipper);
        tipJar.sendTip{value: 1 ether}("Good work");

        emit log("Tip sent to contract");

        uint256 balanceBefore = address(this).balance;
        emit log_named_uint("Balance before withdraw", balanceBefore);

        tipJar.withdrawTips();

        uint256 balanceAfter = address(this).balance;
        emit log_named_uint("Balance after withdraw", balanceAfter);

        assertEq(tipJar.getContractBalance(), 0);
        assertGt(balanceAfter, balanceBefore);
    }
}
