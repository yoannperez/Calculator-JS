var mouse_down = false;

function on_mouse_down_square(event) {
  event.preventDefault();
  event.stopPropagation();
  mouse_down = true;
}

function on_mouse_up(event) {
  event.preventDefault();
  event.stopPropagation();
  mouse_down = false;
}

document.onmousemove = on_mouse_move;

document.onmouseup = on_mouse_up;

function on_mouse_move(event) {
  if (mouse_down === true) {
    document.querySelector("#Calculator").style.left = event.clientX - 50 + "px";
    document.querySelector("#Calculator").style.top = event.clientY - 50 + "px";
  }
}
