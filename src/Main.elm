port module Main exposing (..)

import Html exposing (..)
import Html.Events exposing (..)
import Platform exposing (..)


type Msg
    = Init
    | UpdateGraph Graph
    | GraphUpdated


type alias Node =
    { id : Int
    , marked : Bool
    }


type alias Edge =
    { from : Int
    , to : Int
    }


type alias Graph =
    { nodes : List Node
    , edges : List Edge
    }


type alias Model =
    { graph : Graph
    }


port drawGraph : Graph -> Cmd msg


model : Model
model =
    { graph =
        { nodes = [ { id = 1, marked = False }, { id = 2, marked = False }, { id = 3, marked = False }, { id = 4, marked = False }, { id = 5, marked = False } ]
        , edges = [ { from = 1, to = 2 }, { from = 4, to = 5 }, { from = 4, to = 1 } ]
        }
    }


view : Model -> Html Msg
view model =
    div []
        [ button [ onClick (UpdateGraph model.graph) ] [ text "Update" ]
        ]


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Init ->
            ( model, Cmd.none )

        UpdateGraph graph ->
            ( model, drawGraph graph )

        GraphUpdated ->
            ( model, Cmd.none )


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none


main : Platform.Program Basics.Never Model Msg
main =
    Html.program
        { init = ( model, Cmd.none )
        , update = update
        , subscriptions = subscriptions
        , view = view
        }
