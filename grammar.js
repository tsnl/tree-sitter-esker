/**
 * @file Esker grammar for tree-sitter
 * @author Nikhil Idiculla <nikhil.idiculla@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

export default grammar({
  name: "esker",

  rules: {
    // TODO: add the actual grammar rules
    source_file: $ => "hello"
  }
});
