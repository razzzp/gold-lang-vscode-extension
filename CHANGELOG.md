# Change Log

All notable changes to the "gold-lang" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [Unreleased]

- Initial release

## [0.1.0]

- Migrated to LSP architecture

## [0.1.3]
- Implemented Goto Definition
- Analyze unused local vars
- Warnings for tVarByteArray that are not inout

## [0.2.0]
- Goto definitions will shows parent implems
- Remove inout param analysis
- Complete suggestions immplented
- Type hierarchy (wip)
- LSP with analyze core files on startup
- Fixes to Parsing

## [0.2.1]
- Fix bug in type hierarchy

## [0.2.2]
- Improving in parsing speed
- Process entity trees using threads (faster type hierarchy ready time)

## [0.2.3]
- Naming convention checker
- Unpurged local byte array checker
- Goto Def now handles method and field declaration

## [0.2.4]
- Better memory management