; ------------------------------------------------------------------
; Keywords
; ------------------------------------------------------------------

(IfExpr__if) @keyword.conditional
(IfExpr__else) @keyword.conditional
(PubKw__pub) @keyword

; ------------------------------------------------------------------
; Structural operators — `=` (bind) and `=>` (lambda body) get
; full-fat operator coloring rather than being demoted to delimiter.
; ------------------------------------------------------------------

(Bind__eq) @operator
(LambdaExpr__arrow) @operator
(ArrowExpr__arrow) @operator

; ------------------------------------------------------------------
; Arithmetic / comparison / shift / unary operators
; ------------------------------------------------------------------

(AddOp_Add_0) @operator
(AddOp_Sub_0) @operator
(MulOp_Mul_0) @operator
(MulOp_Div_0) @operator
(MulOp_Mod_0) @operator
(MulOp_Matmul_0) @operator
(UnaryOp_Pos_0) @operator
(UnaryOp_Neg_0) @operator
(UnaryOp_Not_0) @operator
(CmpOp_Lt_0) @operator
(CmpOp_Le_0) @operator
(CmpOp_Gt_0) @operator
(CmpOp_Ge_0) @operator
(CmpOp_Eq_0) @operator
(CmpOp_Ne_0) @operator
(ShiftOp_Shl_0) @operator
(ShiftOp_Shr_0) @operator

; ------------------------------------------------------------------
; Literals
; ------------------------------------------------------------------

(LitBool) @boolean
(LitNumber) @number
(LitString) @string
(Comment) @comment

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

(DotExpr__dot) @punctuation.delimiter
(Field__colon) @punctuation.delimiter
(TypeAnno__colon) @punctuation.delimiter
(TypedName__colon) @punctuation.delimiter
(BindDef__semi) @punctuation.delimiter
(LetExpr__semi) @punctuation.delimiter
(MetavarDef__semi) @punctuation.delimiter
(ConsElement__c) @punctuation.delimiter
(ConsField__c) @punctuation.delimiter
(ConsParam__c) @punctuation.delimiter
(ConsTupleElem__c) @punctuation.delimiter
(TupleHead__c) @punctuation.delimiter
(MetavarDef_params_vec_delimiter) @punctuation.delimiter

; ------------------------------------------------------------------
; Punctuation — brackets
; ------------------------------------------------------------------

(ParenExpr__lp) @punctuation.bracket
(ParenExpr__rp) @punctuation.bracket
(RecordExpr__lb) @punctuation.bracket
(RecordExpr__rb) @punctuation.bracket
(ArrayExpr__lb) @punctuation.bracket
(ArrayExpr__rb) @punctuation.bracket
(IfExpr__lp) @punctuation.bracket
(IfExpr__rp) @punctuation.bracket
(LambdaExpr__lpipe) @punctuation.bracket
(LambdaExpr__rpipe) @punctuation.bracket
