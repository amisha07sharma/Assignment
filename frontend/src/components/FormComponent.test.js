import FormComponent from "./FormComponent";
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';



const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate
  }));

describe("Form Component", () => {
    
    it("In Initial Rendering of Form, the Add Button is Disable", () => {
        render(<FormComponent />);
        const check = screen.getByRole('button',{name : /Add/i});
        expect(check).toBeDisabled();
    });

    it("If Name and Message is Entered, the Add Button becomes Enable", () => {
        render(<FormComponent />);
        userEvent.type(screen.getByPlaceholderText(/Enter a name here/i),"Amisha")
        userEvent.type(screen.getByPlaceholderText(/Enter a message here/i),"Writing a test case")
        const check = screen.getByRole('button',{name : /Add/i});
        expect(check).toBeEnabled();
    });

});