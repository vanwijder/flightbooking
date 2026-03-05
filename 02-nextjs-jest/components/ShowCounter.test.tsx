import { act, fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ShowCounter } from './ShowCounter'

describe('ShowCounter', () => {
    test('show default counter when first shown should be Who count: 0 times', () => {
        // Arrange
        render(<ShowCounter />)

        // Act
        const counter = screen.getByText(/Who count: 0 times/i)

        // Assert
        expect(counter).toBeInTheDocument()
    })

    test('show counter with user name', () => {
        render(<ShowCounter />)

        const nameInput = screen.getByRole('textbox')
        act(() => {
            fireEvent.change(nameInput, { target: { value: 'AnuchitO' } })
        })

        expect(screen.getByText(/AnuchitO: 0 times/i)).toBeInTheDocument()
    })

    test('should increment counter when button is clicked', () => {
        render(<ShowCounter />)

        const button = screen.getByText('Click here')
        fireEvent.click(button)

        expect(screen.getByText(/Who count: 1 times/i)).toBeInTheDocument()
    })

    // change name to AnuchitO then Start count to 5
    test('should increment counter when button is clicked', () => {
        render(<ShowCounter />)

        const nameInput = screen.getByRole('textbox')
        fireEvent.change(nameInput, { target: { value: 'AnuchitO' } })

        const button = screen.getByText('Click here')
        fireEvent.click(button)
        fireEvent.click(button)
        fireEvent.click(button)
        fireEvent.click(button)
        fireEvent.click(button)

        expect(screen.getByText(/AnuchitO: 5 times/i)).toBeInTheDocument()
    })
})
