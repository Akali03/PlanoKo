
export function formattedDate(date){
    return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    })
}
// console.log(formattedDate('2026-06-27'));
