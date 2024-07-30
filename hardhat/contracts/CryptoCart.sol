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

    struct Order {
        uint256 time;
        Product product;
    }

    mapping(uint256 => Product) public products;
    mapping(address => uint256) public orderCount;
    mapping(address => mapping(uint256 => Order)) public orders;

    event ProductCreated(
        uint256 id,
        string name,
        string category,
        uint256 cost,
        uint256 stock
    );
    event ProductPurchased(address addr, uint256 orderId, uint256 productId);

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

        // Add new product
        products[_id] = newProduct;

        // Emit event
        emit ProductCreated(_id, _name, _category, _cost, _stock);
    }

    // Buy Products
    function purchaseProduct(uint256 _id) public payable {
        // Get product
        Product memory product = products[_id];

        require(
            msg.value >= product.cost,
            "Not enough balance to purchase this product !!"
        );
        require(product.stock > 0, "Product not in stock !!");

        // Create an order
        Order memory order = Order(block.timestamp, product);

        // Save order
        orderCount[msg.sender]++;
        uint256 orderId = orderCount[msg.sender];
        orders[msg.sender][orderId] = order;

        // Reduce the stock
        products[_id].stock = product.stock - 1;

        // Emit Event
        emit ProductPurchased(msg.sender, orderId, product.id);
    }

    // Withdraw Funds
    function withdraw() public onlyOwner {
        (bool callSuccess, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(callSuccess, "Withdraw failed !!");
    }
}
