

function printInfo(element) {
    let openWindow = window.open("", "title", "attributes");
    openWindow.document.write(element.previousSibling.innerHTML);
    openWindow.document.close();
    openWindow.focus();
    openWindow.print();
    openWindow.close();
}