var grades = {
    Oleg: 98,
    Hanna: 78,
    Olena: 100,
};
function checkGrades(grades) {
    for (var grade in grades) {
        if (typeof grades[grade] !== 'number') {
            return false;
        }
    }
    return true;
}
console.log(checkGrades(grades));
