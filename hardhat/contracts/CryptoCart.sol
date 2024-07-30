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

    constructor() {
        name = "CryptoCart";
        owner = msg.sender;
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
    ) public {
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
    }

    // Buy Products

    // Withdraw Funds
}
