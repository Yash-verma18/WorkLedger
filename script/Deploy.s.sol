// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {TipJar} from "../src/TipJar.sol";

contract Deploy is Script {
    TipJar public tipJar;
    function setUp() public {}
    function run() public {
        vm.startBroadcast();
        tipJar = new TipJar();
        vm.stopBroadcast();
        console.log("TipJar deployed to:", address(tipJar));
        console.log("Owner address:", tipJar.owner());
    }
}
