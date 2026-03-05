import { average } from "./average";


describe('average', () => {
    test('should calculate the average of an array of numbers', () => {
        // Arrange
        const numbers = [1, 2, 3, 4, 5];

        // Act
        const result = average(numbers);

        // Assert
        expect(result).toBe(3);
    })

    test('should return 0 for an empty array', () => {
        // Arrange
        const numbers: number[] = [];

        // Act
        const result = average(numbers);

        // Assert
        expect(result).toBe(0);
    })
})