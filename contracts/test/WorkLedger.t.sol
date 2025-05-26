// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/WorkLedger.sol";

contract WorkLedgerTest is Test {
    WorkLedger public workLedger;
    address public owner;
    address tipper;
    receive() external payable {}

    function setUp() public {
        workLedger = new WorkLedger();
        owner = address(this);
        tipper = address(0x1);
        vm.deal(tipper, 5 ether); // fund the tipper
    }

    function testLeaveValidTestimonial() public {
        vm.prank(tipper);
        workLedger.leaveTestimonial{value: 1 ether}(
            "Great work!",
            "Landing page design",
            5
        );

        WorkLedger.Testimonial[] memory all = workLedger.getAllTestimonials();
        assertEq(all.length, 1);
        assertEq(all[0].from, tipper);
        assertEq(all[0].amount, 1 ether);
        assertEq(all[0].rating, 5);
        assertEq(all[0].message, "Great work!");
    }

    function testRevertOnEmptyMessage() public {
        vm.prank(tipper);
        vm.expectRevert("Message cannot be empty");
        workLedger.leaveTestimonial{value: 1 ether}(
            "",
            "Landing page design",
            4
        );
    }

    function testRevertOnEmptyWorkDescription() public {
        vm.prank(tipper);
        vm.expectRevert("Work description required");
        workLedger.leaveTestimonial{value: 1 ether}("Superb", "", 4);
    }

    function testRevertOnInvalidRating() public {
        vm.prank(tipper);
        vm.expectRevert("Rating must be between 1 and 5");
        workLedger.leaveTestimonial{value: 1 ether}(
            "Clean code",
            "Smart contract",
            0
        );
    }

    function testRevertOnZeroETH() public {
        vm.prank(tipper);
        vm.expectRevert("Tip must be greater than 0");
        workLedger.leaveTestimonial{value: 0}("Awesome job", "Figma UI", 5);
    }

    function testWithdrawTips() public {
        vm.prank(tipper);
        workLedger.leaveTestimonial{value: 2 ether}(
            "Excellent delivery",
            "Backend service",
            5
        );

        uint256 balanceBefore = workLedger.getContractBalance();
        assertEq(balanceBefore, 2 ether);

        uint256 ownerBalBefore = owner.balance;

        workLedger.withdrawTips();

        assertEq(workLedger.getContractBalance(), 0);
        assertGt(owner.balance, ownerBalBefore);
    }

    function testWithdrawFailsIfNotOwner() public {
        vm.prank(tipper);
        vm.expectRevert("Only owner can perform this action");
        workLedger.withdrawTips();
    }
}
