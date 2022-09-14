import { Component, createRef, useRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';

interface Data {
  id: number,
  name: string,
  image: string,
  description: string,
  price: number,
  available: boolean
}

interface ModalAddFoodProps {
  handleAddFood: (food:Data ) => Promise<void>
  setIsOpen: () => void
  isOpen: boolean
}


function ModalAddFood({isOpen, setIsOpen, handleAddFood}:ModalAddFoodProps){
  const formRef = useRef(null)

    const handleSubmit = async (data: Data) => {


    handleAddFood(data);
    setIsOpen();
  };
      return (
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Novo Prato</h1>
          <Input name="image" placeHolder="Cole o link aqui" />

          <Input name="name" placeHolder="Ex: Moda Italiana" />
          <Input name="price" placeHolder="Ex: 19.90" />

          <Input name="description" placeHolder="Descrição" />
          <button type="submit" data-testid="add-food-button">
            <p className="text">Adicionar Prato</p>
            <div className="icon">
              <FiCheckSquare size={24} />
            </div>
          </button>
        </Form>
      </Modal>
    );
}

// class ModalAddFood extends Component {
//   constructor(props) {
//     super(props);

//     this.formRef = createRef();
//   }

//   handleSubmit = async data => {
//     const { setIsOpen, handleAddFood } = this.props;

//     handleAddFood(data);
//     setIsOpen();
//   };

//   render() {
//     const { isOpen, setIsOpen } = this.props;

//     return (
//       <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
//         <Form ref={this.formRef} onSubmit={this.handleSubmit}>
//           <h1>Novo Prato</h1>
//           <Input name="image" placeholder="Cole o link aqui" />

//           <Input name="name" placeholder="Ex: Moda Italiana" />
//           <Input name="price" placeholder="Ex: 19.90" />

//           <Input name="description" placeholder="Descrição" />
//           <button type="submit" data-testid="add-food-button">
//             <p className="text">Adicionar Prato</p>
//             <div className="icon">
//               <FiCheckSquare size={24} />
//             </div>
//           </button>
//         </Form>
//       </Modal>
//     );
//   }
// };

export default ModalAddFood;
