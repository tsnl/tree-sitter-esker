; ------------------------------------------------------------------
; Keywords
; ------------------------------------------------------------------

"if"   @keyword.conditional
"else" @keyword.conditional
"pub"  @keyword

; ------------------------------------------------------------------
; Operators — structural, arithmetic, comparison, shift, unary
; ------------------------------------------------------------------

"="  @operator
"=>" @operator
"->" @operator
"+"  @operator
"-"  @operator
"*"  @operator
"/"  @operator
"%"  @operator
"@"  @operator
"!"  @operator
"<"  @operator
"<=" @operator
">"  @operator
">=" @operator
"==" @operator
"!=" @operator
"<<" @operator
">>" @operator

; ------------------------------------------------------------------
; Literals
; ------------------------------------------------------------------

(LitBool)   @boolean
(LitNumber) @number
(LitString) @string
(Comment)   @comment

; ------------------------------------------------------------------
; Identifiers
;   - dunder names      → @function.builtin
;   - known primitives  → @type.builtin
;   - capitalized names → @type
;   - everything else   → @variable
; ------------------------------------------------------------------

((Ident_name) @function.builtin
  (#match? @function.builtin "^__.*__$"))

((Ident_name) @type.builtin
  (#any-of? @type.builtin
    "type" "unit" "bool" "int" "float" "usize" "isize" "string"
    "struct" "enum" "Fn" "Ten"))

((Ident_name) @type
  (#match? @type "^[A-Z]"))

(Ident_name) @variable

; ------------------------------------------------------------------
; Punctuation — delimiters
; ------------------------------------------------------------------

"." @punctuation.delimiter
":" @punctuation.delimiter
";" @punctuation.delimiter
"," @punctuation.delimiter

; ------------------------------------------------------------------
; Punctuation — brackets
; ------------------------------------------------------------------

"(" @punctuation.bracket
")" @punctuation.bracket
"{" @punctuation.bracket
"}" @punctuation.bracket
"[" @punctuation.bracket
"]" @punctuation.bracket
"|" @punctuation.bracket
