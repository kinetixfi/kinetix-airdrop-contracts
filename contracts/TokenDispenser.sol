// SPDX-License-Identifier: BSD-3-Clause
pragma solidity 0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TokenDispenser is Ownable {
    IERC20 public immutable token;
    uint256 public immutable programId;

    uint256 public totalAmountToClaim;

    struct Recipient {
        uint128 amount;
        uint48 claimTimestamp;
        bool claimed;
    }

    mapping(address => Recipient) public recipients;

    event Claim(address indexed _recipient, uint256 _amount);
    event AddRecipient(address indexed _recipient, uint256 _amount);
    event Withdrawal(address indexed _token, address indexed _receiver, uint256 _amount);

    constructor(uint256 _programId, address _tokenAddress) Ownable(msg.sender) {
        require(_tokenAddress != address(0), "Zero token address");
        require(_programId > 0, "Invalid programId");

        programId = _programId;
        token = IERC20(_tokenAddress);
    }

    function addRecipients(address[] calldata _recipients, uint128[] calldata _amounts) external onlyOwner {
        require(_recipients.length == _amounts.length, "Invalid array length");

        for (uint256 i; i < _recipients.length; i++) {
            _addRecipient(_recipients[i], _amounts[i]);
        }
    }

    function addRecipient(address _recipient, uint128 _amount) external onlyOwner {
        _addRecipient(_recipient, _amount);
    }

    function _addRecipient(address _recipient, uint128 _amount) private {
        require(_amount > 0, "Amount must valid");
        require(recipients[_recipient].amount == 0, "Already added");

        recipients[_recipient] = Recipient(_amount, uint48(block.timestamp), false);

        totalAmountToClaim += _amount;

        emit AddRecipient(_recipient, _amount);
    }

    function claimTokens() external {
        Recipient storage recipient = recipients[msg.sender];
        require(recipient.amount > 0, "No tokens allocated");
        require(!recipient.claimed, "Already claimed");

        recipient.claimed = true;
        recipient.claimTimestamp = uint48(block.timestamp);

        totalAmountToClaim -= recipient.amount;
        token.transfer(msg.sender, recipient.amount);

        emit Claim(msg.sender, recipient.amount);
    }

    function withdrawEmergencyToken(IERC20 _token, address _receiver, uint256 _amount) external onlyOwner {
        require(address(_token) != address(0), "Zero token address");
        require(_receiver != address(0), "Zero receiver address");
        if (_token == token) {
            uint256 tokenBalance = IERC20(_token).balanceOf(address(this));
            require(totalAmountToClaim + _amount <= tokenBalance, "Not allowed to withdraw users' funds");
        }

        _token.transfer(_receiver, _amount);

        emit Withdrawal(address(_token), _receiver, _amount);
    }
}
