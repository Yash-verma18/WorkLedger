// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
contract TipJar is ReentrancyGuard {
    address public owner;

    event Tipped(
        address indexed from,
        uint256 amount,
        string message,
        uint256 timestamp
    );

    struct Tip {
        address from;
        uint256 amount;
        string message;
        uint256 timestamp;
    }

    Tip[] public tips;
    mapping(address => Tip[]) public tipsBySender;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    receive() external payable {
        revert("Send tips via sendTip with a message");
    }
    // nonReentrant
    function sendTip(string calldata message) external payable {
        require(msg.value > 0, "Tip must be greater than 0");
        require(
            bytes(message).length > 0 && bytes(message).length <= 280,
            "Message cannot be empty"
        );

        Tip memory userTip = Tip({
            from: msg.sender,
            amount: msg.value,
            message: message,
            timestamp: block.timestamp
        });

        tips.push(userTip);
        tipsBySender[msg.sender].push(userTip);

        emit Tipped(msg.sender, msg.value, message, block.timestamp);
    }

    function getAllTips() external view returns (Tip[] memory) {
        return tips;
    }

    function withdrawTips() public onlyOwner {
        uint256 contractBalance = address(this).balance;
        require(contractBalance > 0, "No tips to withdraw");
        (bool success, ) = payable(owner).call{value: contractBalance}("");
        require(success, "Transfer failed");
    }
    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
