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
  return seq(
    repeat(seq(element, sep)),
    optional(element)
  )
}

/**
 * @param {RuleOrLiteral} element - rule for each element in the list
 * @param {RuleOrLiteral} sep - separator between elements (default: comma)
 * @returns {Rule}
 */
function list1(element, sep) {
  return seq(
    element,
    optional(seq(sep, list(element, sep)))
  )
}

export default grammar({
  name: "esker",

  rules: {
    //
    // Source file
    //

    source_file: $ =>
      repeat($.statement),

    //
    // Statement
    //

    statement: $ =>
      seq(choice($.define, $.declare), ";"),

    define: $ =>
      seq($.ident, "=", $.term),

    declare: $ =>
      seq($.ident, ":", $.term),

    //
    // Term
    //

    term: $ =>
      $.primary_term,

    closed_term: $ =>
      choice(
        $.lambda_term,
        $.pi_term,
        $.paren_term,
        $.array_term,
        $.record_term,
        $.record_type_term,
        $.chain_term,
        $.unit_term,
      ),
    lambda_term: $ =>
      seq("(", list($.declare, ","), ")", "=>", $.closed_term),
    pi_term: $ =>
      seq("(", list($.declare, ","), ")", "->", $.closed_term),
    paren_term: $ =>
      seq("(", $.term, ")"),
    array_term: $ =>
      seq("[", list($.term, ","), "]"),
    record_term: $ =>
      seq("{", list1($.define, ","), "}"),
    record_type_term: $ =>
      seq("{", list1($.declare, ","), "}"),
    chain_term: $ =>
      seq("{", list($.statement, ";"), $.term, "}"),
    unit_term: $ =>
      seq("{", "}"),

    primary_term: $ =>
      choice(
        $.closed_term,
        $.ident,
        $.number,
        $.if_term,
      ),
    if_term: $ =>
      seq("if", $.term, $.closed_term, "else", $.closed_term),

    // TODO: postfix_term

    //
    // Tokens
    //

    ident: $ =>
      token(
        new RustRegex("[_]*[a-z][a-zA-Z0-9_]*")
      ),

    constructor: $ =>
      token(
        new RustRegex("[_]*[A-Z][a-zA-Z0-9_]*")
      ),

    number: $ =>
      token(
        choice(
          new RustRegex("(?i)[0-9][0-9_]*(\\.[0-9_]+)?(e[+-]?[0-9_]+)?"),
          new RustRegex("(?i)0x[0-9a-f_]+"),
        )
      ),

    comment: $ =>
      token(
        choice(
          seq("//", new RustRegex(".*")),
          seq("/*", new RustRegex("[^*]*\\*+([^/*][^*]*\\*+)*"), "/")
        ),
      ),
  },


  extras: ($) => [
    new RustRegex("\\s"),
    $.comment,
  ],
});
