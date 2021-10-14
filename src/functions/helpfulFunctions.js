const joinSkills = (array) => {
    if (array.length > 1) {
        array[array.length - 1] = `, ${array[array.length - 1]}`;
    }
    return array.join(", ")
}

module.exports = { joinSkills };