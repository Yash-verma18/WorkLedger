// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {WorkLedger} from "../src/WorkLedger.sol";

contract Deploy is Script {
    WorkLedger public workLedger;
    function setUp() public {}
    function run() public {
        vm.startBroadcast();
        workLedger = new WorkLedger();
        vm.stopBroadcast();
        console.log("TipJar deployed to:", address(workLedger));
        console.log("Owner address:", workLedger.owner());
    }
}
