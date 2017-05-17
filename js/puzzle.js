/*
 * This javascript files contains all the javascript for puzzle.js to work
*/

// successful pieces variable keeps track of 
// how many correct puzzle pieces has been placed by the user.
var successfulPieces = 0;
var targetOrigin;

/*
 * This function is called on page load and initialises the puzzle
 * Purpose : Sets up event listeners on all the puzzle pieces
 * and target divs on the puzzle board to implement drag and drop functionality
*/
function init() {
    //it is necessary to add event listeners instead of using inline event listeners like ondrag
    //reason : if we utilize inline event listeners, when we drop onto another draggable element,
    //the application wouldn't work properly
    var elements = document.getElementsByClassName('puzzlePieces');

    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener('dragstart', dragPuzzlePiece);
    }

    elements = document.getElementsByClassName('puzzleBoardPieces');
    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener('mousedown', setOriginTarget);
        elements[i].addEventListener('dragover', allowPuzzlePieceDrop);
        elements[i].addEventListener('drop', dropPuzzlePiece);
    }

    elements = document.getElementById('container');
    elements.addEventListener('dragover', allowPuzzlePieceDrop);
    elements.addEventListener('drop', dropPuzzlePiece);
    elements.addEventListener('mousedown', setOriginTarget);
}

/*
* The following function is called when the user starts dragging a puzzle piece
* inputs : 1) e : event generated when dragging is started
*/
function dragPuzzlePiece(e) {
    e.dataTransfer.setData("text", e.target.id);
}

/*
* The following function is called when the user moves a puzzle piece over a target div
* inputs : 1) e : event generated when element is dragged over a region where it can be dropped
*/
function allowPuzzlePieceDrop(e) {
    // prevent default behaviour so that we make it possible to drop the element
    e.preventDefault();
}

/*
* The following function is called when the user drops a puzzle piece on to a target div
* inputs : 1) e : event generated when element is dropped on to a target element
*/
function dropPuzzlePiece(e) {
    e.preventDefault();
    //find out which element was dropped
    var data = e.dataTransfer.getData("text");
    var droppedPuzzlePiece = document.getElementById(data);

    //checking if the piece has been dropped onto another target div which already has a puzzle piece
    //in this case, we would have to exchange the two pieces.
    var element = document.getElementById(this.id);
    if (element.children.length > 0 && element.className == "puzzleBoardPieces") {
        var child = element.children[0];
        //exchange the piece between the two target divs
        targetOrigin.appendChild(child);
        element.innerHTML = "";
        checkPuzzlePiece(child, targetOrigin)
    }

    //setting margins according to where the puzzle piece is
    if (element.className == "puzzleBoardPieces") {
        droppedPuzzlePiece.style.margin = "0";
    } else if (element.id == "container") {
        droppedPuzzlePiece.style.margin = '3px';
    }

    this.appendChild(droppedPuzzlePiece);

    //checking if the dropped piece and the target div match.
    //If yes, then we will update the score
    checkPuzzlePiece(droppedPuzzlePiece, e.currentTarget);

    //checking if all the puzzle pieces have been placed in their correct position
    setTimeout(function() {
        if (successfulPieces == 4) {
            alert("You won!");
        }
    }, 300);
}

/*
 * The following function checks if the puzzle piece has been dropped on to the correct target div
 * Purpose : 1) Checks if the puzzle piece has been dropped on to the correct target div
             2) If yes, the function updates the score
             3) If yes, it also removes all event listeners associated with the puzzle piece and target div
                and makes the puzzle piece fixed ( the user cant drag this piece anymore ).
 * Inputs : 1) puzzlePiece : the puzzle piece dom element which has been dropped
            2) targetPiece : the target div dom element into which the puzzle piece has been dropped
*/
function checkPuzzlePiece(puzzlePiece, targetPiece) {
    //if the id of the two input elements match it means the puzzle has been placed on the correct target div.
    if (((puzzlePiece.id).split("_"))[1] == ((targetPiece.id).split("_"))[1]) {
        successfulPieces++;
        puzzlePiece.draggable = false;
        puzzlePiece.removeEventListener('dragstart', dragPuzzlePiece);
        puzzlePiece.style.cursor = 'default';
        targetPiece.removeEventListener('mousedown', setOriginTarget);
        targetPiece.removeEventListener('dragover', allowPuzzlePieceDrop);
        targetPiece.removeEventListener('drop', dropPuzzlePiece);
    }
}

/*
 * The following function keeps track of where the puzzle piece has been brought from
 * i.e. whether it has been dragged from the container or another target div from the puzzle board
 * This helps exhange two puzzle pieces, when one piece is dropped on a target div
 * which already contains a puzzle piece
*/
function setOriginTarget(e) {
    targetOrigin = e.currentTarget;
}