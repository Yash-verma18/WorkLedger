// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract WorkLedger is ReentrancyGuard {
    address public owner;

    struct Testimonial {
        address from;
        uint256 amount;
        string message; // The review
        string workDescription; // What the work was
        uint8 rating; // Rating out of 5
        uint256 timestamp;
    }

    Testimonial[] internal testimonials;
    mapping(address => Testimonial[]) internal testimonialsBySender;

    event TestimonialSubmitted(
        address indexed from,
        uint256 amount,
        string message,
        string workDescription,
        uint8 rating,
        uint256 timestamp
    );

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    receive() external payable {
        revert("Use leaveTestimonial() to submit a review");
    }

    function leaveTestimonial(
        string calldata message,
        string calldata workDescription,
        uint8 rating
    ) external payable nonReentrant {
        require(msg.value > 0, "Tip must be greater than 0");
        require(bytes(message).length > 0, "Message cannot be empty");
        require(bytes(workDescription).length > 0, "Work description required");
        require(rating >= 1 && rating <= 5, "Rating must be between 1 and 5");

        Testimonial memory t = Testimonial({
            from: msg.sender,
            amount: msg.value,
            message: message,
            workDescription: workDescription,
            rating: rating,
            timestamp: block.timestamp
        });

        testimonials.push(t);
        testimonialsBySender[msg.sender].push(t);

        emit TestimonialSubmitted(
            msg.sender,
            msg.value,
            message,
            workDescription,
            rating,
            block.timestamp
        );
    }

    function getAllTestimonials() external view returns (Testimonial[] memory) {
        return testimonials;
    }

    function getMyTestimonials(
        address user
    ) external view returns (Testimonial[] memory) {
        return testimonialsBySender[user];
    }

    function withdrawTips() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No tips to withdraw");
        (bool success, ) = payable(owner).call{value: balance}("");
        require(success, "Transfer failed");
    }

    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
