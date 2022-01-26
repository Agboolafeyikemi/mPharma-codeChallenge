import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import AddModal from './components/AddModal'
import { multiply, makeLowercase } from "../src/HelperFunctions/HelperFunctions";

test("Multiply", () => {
    expect(multiply(2,10)).toBe(20)
})

test('makeLowerCase', () => {
  expect(makeLowercase("Mr Stark")).toBe('mr stark')
})

it('checkAddModalRender', () => {
  const {queryByTitle, } = render(<AddModal/>)
  const linkElement = screen.getByText('Add Product');
  expect(linkElement).toBeInTheDocument();
  // const productName = queryByTitle('productName')
  // console.log(productName)
  //expect(productName).toBeTruthy();
})

describe('clickSaveButton', ()=> {
  it('onClick', () => {
    const {queryByDisplayValue} = render(<AddModal/>)
    const saveButton = queryByDisplayValue('Save')
    expect(saveButton.innerHTML).toBe('Save')
    fireEvent.click(saveButton)
    
  })
})
