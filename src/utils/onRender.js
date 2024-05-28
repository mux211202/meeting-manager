export  function onRender(id, phase, actualDuration) {
    if(phase==="update") {
        console.log(id, phase, actualDuration)
    }
}