module Language exposing (..)


type BooleanExpr
    = AndExpr BooleanExpr BooleanExpr
    | OrExpr BooleanExpr BooleanExpr
    | NotExpr BooleanExpr
    | CmpExpr CmpOp ValueExpr ValueExpr


type CmpOp
    = GreaterOp
    | SmallerOp
    | EqualOp
    | UnequalOp


type ValueExpr
    = StringConstExpr String
    | IntConstExpr Int
      -- | SetExpr (List ValueExpr)
    | ReferenceExpr Name
    | BinOpExpr BinOp ValueExpr ValueExpr
    | BoolOpExpr


type BinOp
    = PlusOp
    | MinusOp
    | DivOp
    | MultOp


type Stmt
    = AssignmentStmt Name ValueExpr
    | BlockStmt List Stmt
    | IfElseStmt BooleanExpr Stmt Stmt
    | IfStmt BooleanExpr Stmt
    | WhileStmt BooleanExpr Stmt


type Value
    = StringValue String
    | IntValue Int
    | SetValue (List Value)


type alias Ident =
    Int


type alias Name =
    String


type alias Variable =
    { id : Ident
    , name : Name
    }


type alias State =
    { environment : Variable -> Value
    , variables : List Variable
    , program : Stmt
    }


evalBoolExpr : State -> BooleanExpr -> Result String Bool
evalBoolExpr state expr =
    case expr of
        AndExpr bexp1 bexp2 ->
            Result.map2 (&&) (evalBoolExpr state bexp1) (evalBoolExpr state bexp2)

        OrExpr bexp1 bexp2 ->
            Result.map2 (||) (evalBoolExpr state bexp1) (evalBoolExpr state bexp2)

        NotExpr bexp ->
            Result.map (not) (evalBoolExpr state bexp)

        CmpExpr cmpOp exp1 exp2 ->
            Err 'False"


evalExpr : State -> ValueExpr -> Result String Value
evalExpr state expr =
    case expr of
        StringConstExpr value ->
            Ok (StringValue value)

        IntConstExpr value ->
            Ok (IntValue value)

        ReferenceExpr name ->
            state.variables
                |> List.filter (\var -> var.name == name)
                |> List.head
                |> Maybe.map state.environment
                |> Result.fromMaybe ("Failed to lookup value for ''" ++ name ++ "''")

        BinOpExpr binOp leftExpr rightExpr ->
            case (evalExpr state leftExpr) of
                Ok leftValue ->
                    case (evalExpr state rightExpr) of
                        Ok rightValue ->
                            applyBinOp binOp leftValue rightValue

                        Err msg2 ->
                            Err msg2

                Err msg1 ->
                    Err msg1


applyBinOp : BinOp -> Value -> Value -> Result String Value
applyBinOp op left right =
    case left of
        StringValue v1 ->
            case right of
                StringValue v2 ->
                    applyStringOp op v1 v2

                _ ->
                    Err "Types are not compatible"

        IntValue v1 ->
            case right of
                IntValue v2 ->
                    applyIntOp op v1 v2

                _ ->
                    Err "Types are not compatible"

        SetValue v1 ->
            case right of
                SetValue v2 ->
                    applySetOp op v1 v2

                _ ->
                    Err "Types are not compatible"


applyStringOp : BinOp -> String -> String -> Result String Value
applyStringOp op leftValue rightValue =
    case op of
        PlusOp ->
            Ok (StringValue (leftValue ++ rightValue))

        _ ->
            Err "Operators not applicable on Strings"


applyIntOp : BinOp -> Int -> Int -> Result String Value
applyIntOp op leftValue rightValue =
    case op of
        PlusOp ->
            Ok (IntValue (leftValue + rightValue))

        MinusOp ->
            Ok (IntValue (leftValue - rightValue))

        DivOp ->
            Ok (IntValue (leftValue // rightValue))

        MultOp ->
            Ok (IntValue (leftValue * rightValue))


applySetOp : BinOp -> List Value -> List Value -> Result String Value
applySetOp op leftValue rightValue =
    case op of
        PlusOp ->
            Ok (SetValue (List.append leftValue rightValue))

        _ ->
            Err "Operators not applicable on Sets"
