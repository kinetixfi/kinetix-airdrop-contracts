// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

abstract contract TokenDispenser is Ownable {
    IERC20 public token; // Address of the token to be dispensed

    // Structure to hold recipient info based on your distribution logic
    struct Recipient {
        uint256 amount;
        uint256 lastClaimTimestamp; // If using time-based distribution
        bool claimed; // If using simple claims
    }

    mapping(address => Recipient) public recipients;

    // The Claim event helps off-chain applications understand
    // what happens within your contract.
    event Claim(address indexed _recepient, uint256 _amount);

    constructor() {}

    // Function to update token address (onlyOwner)
    function updateToken(address _tokenAddress) external onlyOwner {
        token = IERC20(_tokenAddress);
    }

    // Function to add tokens to the dispenser (onlyOwner)
    function fundDispenser(uint256 _amount) external onlyOwner {
        require(token.transferFrom(msg.sender, address(this), _amount));
    }

    // Function to add recipients (onlyOwner)
    function addRecipient(
        address _recipient,
        uint256 _amount
    ) external onlyOwner {
        recipients[_recipient] = Recipient(_amount, block.timestamp, false);
    }

    // Function for recipients to claim tokens (Implement your logic)
    function claimTokens() external {
        Recipient storage recipient = recipients[msg.sender];
        // ... Add checks for eligibility based on your chosen mechanism
        require(recipient.amount > 0, "No tokens allocated");
        require(!recipient.claimed, "Already claimed");

        recipient.claimed = true;
        token.transfer(msg.sender, recipient.amount);

        // Notify off-chain applications of the transfer.
        emit Claim(msg.sender, recipient.amount);
    }
}
