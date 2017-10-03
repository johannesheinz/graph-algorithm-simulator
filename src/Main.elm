module Main exposing (..)

import Html exposing (Html, button, div, text, ul, li)
import Html.Attributes exposing (class, style)
import List exposing (foldr, map)
import List.Extra exposing (..)
import Maybe exposing (Maybe)
import Task exposing (..)


type Msg
    = Init


type alias Model =
    String


model : Model
model =
    "Hallo Welt"


view : Model -> Html Msg
view model =
    div [] [ text model ]


update : Msg -> Model -> Model
update msg model =
    case msg of
        Init ->
            model


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none


main : Platform.Program Basics.Never Model Msg
main =
    Html.beginnerProgram
        { model = model
        , view = view
        , update = update
        }
