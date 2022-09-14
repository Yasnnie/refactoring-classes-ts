import { Component, useState, useEffect } from "react";

import Header from "../../components/Header";
import api from "../../services/api";
import Food from "../../components/Food";
import ModalAddFood from "../../components/ModalAddFood";
import ModalEditFood from "../../components/ModalEditFood";
import { FoodsContainer } from "./styles";

interface Data {
  id: number,
  name: string,
  image: string,
  description: string,
  price: number,
  available: boolean
}

interface EditingFoodProps{
  editingFood:Data, 
  editModalOpen: boolean
}

function Dashboard() {
  const [foods, setFoods] = useState<Data[]>([]);
  const [editingFood, setEditingFood] = useState<EditingFoodProps>({} as EditingFoodProps);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    api.get("/foods").then((res) => setFoods(res.data));
  }, []);

  const handleAddFood = async (food: Data) => {
    try {
      const response = await api.post("/foods", {
        ...food,
        available: true,
      });

      setFoods([...foods, response.data]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteFood = async (id: number) => {
    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter(food => food.id !== id);

    setFoods(foodsFiltered);
  }

  const handleEditFood = (food: Data) =>{ 
    setEditingFood({ editingFood: food, editModalOpen: true });
    toggleEditModal()
};
  

  const handleUpdateFood = async (food: Data)  => {

    try {
      const foodUpdated = await api.put(
        `/foods/${editingFood.editingFood.id}`,
        { ...editingFood, ...food },
      );

      const foodsUpdated = foods.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data,
      );

      setFoods(foodsUpdated);
    } catch (err) {
      console.log(err);
    }
  }

  const toggleModal = () => setModalOpen(!modalOpen);

  const toggleEditModal = () => setEditModalOpen(!editModalOpen);

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map((food) => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  );
}

export default Dashboard;
