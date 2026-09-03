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
    source_file: $ => choice(
      $.lid,
      $.number,
    ),

    //
    // Terminals
    //

    lid: $ => new RustRegex("[_]*[a-z][a-zA-Z0-9_]*"),
    number: $ => choice(
      new RustRegex("(?i)[0-9_]+\\.[0-9_]+(e[+-]?[0-9_]+)?"),
      new RustRegex("(?i)0x[0-9a-f_]+"),
    ),
  }
});
