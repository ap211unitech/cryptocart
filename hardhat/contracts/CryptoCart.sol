// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract CryptoCart {
    string public name;
    address public owner;

    struct Product {
        uint256 id;
        string name;
        string category;
        string image;
        uint256 cost;
        uint256 rating;
        uint256 stock;
    }

    mapping(uint256 => Product) public products;

    event ProductCreated(
        uint256 id,
        string name,
        string category,
        uint256 cost,
        uint256 stock
    );

    constructor() {
        name = "CryptoCart";
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner allowed !!");
        _;
    }

    // Create Product
    function createProduct(
        uint256 _id,
        string memory _name,
        string memory _category,
        string memory _image,
        uint256 _cost,
        uint256 _rating,
        uint256 _stock
    ) public onlyOwner {
        Product memory newProduct = Product(
            _id,
            _name,
            _category,
            _image,
            _cost,
            _rating,
            _stock
        );
        products[_id] = newProduct;
        emit ProductCreated(_id, _name, _category, _cost, _stock);
    }

    // Buy Products
    function purchaseProduct(uint256 _id) public payable {}

    // Withdraw Funds
}
