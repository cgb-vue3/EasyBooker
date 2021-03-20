
function uploadCheck(file: File): boolean {
    const option = {
        type: ['image/png'],
        length: 1024,
    }

    if ( !(option.type.includes(file.type))) {
        return false
    }

    return true
}

export default uploadCheck