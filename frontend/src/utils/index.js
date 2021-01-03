export const calculateAverage = (fic) => {
    console.log('CALC AVERAGE FIC', fic)
    if (fic) {
        const reviewsArray = fic.Reviews;
        const mappedReviews = reviewsArray.map(review => review.rating)

        if (fic.Reviews.length) {
            let total = 0
        for(let i = 0; i < mappedReviews.length; i++) {
            total += mappedReviews[i];
        }
        let average = total / mappedReviews.length;
        // setAverage(average);
        return average;
        } else {
            return "No reviews yet!";
        }           }
}
