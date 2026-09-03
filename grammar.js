/**
 * @file Esker grammar for tree-sitter
 * @author Nikhil Idiculla <nikhil.idiculla@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

/**
 * @param {string} field_name - name of the field to accumulate elements into
 * @param {RuleOrLiteral} element - rule for each element in the list
 * @param {RuleOrLiteral} sep - separator between elements (default: comma)
 * @returns {Rule}
 */
function list(field_name, element, sep) {
  return seq(
    repeat(seq(field(field_name, element), sep)),
    optional(element)
  )
}

/**
 * @param {string} field_name - name of the field to accumulate elements into
 * @param {RuleOrLiteral} element - rule for each element in the list
 * @param {RuleOrLiteral} sep - separator between elements (default: comma)
 * @returns {Rule}
 */
function list1(field_name, element, sep) {
  return seq(
    field(field_name, element),
    optional(seq(sep, list(field_name, element, sep)))
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
      seq(
        field("name", $.ident),
        "=",
        field("init", $.term)
      ),

    declare: $ =>
      seq(
        field("name", $.ident),
        ":",
        field("ann", $.term)
      ),

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
      seq("(", list("params", $.declare, ","),")","=>",field("body", $.closed_term)),
    pi_term: $ =>
      seq("(", list("params", $.declare, ","), ")", "->", field("body", $.closed_term)),
    paren_term: $ =>
      seq("(", field("inner", $.term), ")"),
    array_term: $ =>
      seq("[", list("elems", $.term, ","), "]"),
    record_term: $ =>
      seq("{", list1("fields", $.define, ","), "}"),
    record_type_term: $ =>
      seq("{", list1("fields", $.declare, ","), "}"),
    chain_term: $ =>
      seq("{", field("prefix", repeat($.statement)), field("tail", $.term), "}"),
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
      seq(
        "if",
        field("cond", $.term),
        field("then", $.closed_term),
        "else",
        field("else", $.closed_term)
      ),

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
