/**
 * @file Esker grammar for tree-sitter
 * @author Nikhil Idiculla <nikhil.idiculla@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

/**
 * @param {RuleOrLiteral} element - rule for each element in the list
 * @param {RuleOrLiteral} sep - separator between elements (default: comma)
 * @returns {Rule}
 */
function list(element, sep) {
    return seq(repeat(seq(element, sep)), optional(element))
}

export default grammar({
  name: "esker",

  rules: {
    source_file: $ => list(choice($.lid, $.number), /,/),

    //
    // Terminals
    //

    lid: $ => token(new RustRegex("[_]*[a-z][a-zA-Z0-9_]*")),
    number: $ => token(
      choice(
        new RustRegex("(?i)[0-9][0-9_]*(\\.[0-9_]+)?(e[+-]?[0-9_]+)?"),
        new RustRegex("(?i)0x[0-9a-f_]+"),
      )
    ),

    //
    // Skip
    //

    comment: ($) =>
      token(
        choice(seq("//", /.*/), seq("/*", /[^*]*\*+([^/*][^*]*\*+)*/, "/")),
      ),
  },


  extras: ($) => [
    /\s/, // whitespace
    $.comment,
  ],
});
