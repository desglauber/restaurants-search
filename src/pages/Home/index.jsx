import React, { useState } from "react";
import { useSelector } from "react-redux";
import TextField, { Input } from "@material/react-text-field";
import MaterialIcon from "@material/react-material-icon";

import logo from "../../assets/edecomerlogo.png";
import restaurante from "../../assets/galinheiro.png";
import { Card, RestaurantCard, Modal, Map, Loader, Skeleton } from "../../components/";

import { Container, Carousel, Logo, Search, Wrapper, CarouselTitle, ModalTitle, ModalContent } from "./styles"

const Home = () => {
    const [inputValue, setInputValue] = useState('');
    const [query, setQuery] = useState(null);
    const [placeId, setPlaceId] = useState(null);
    const [modalOpened, setModalOpened] = useState(false);
    const { restaurants, restaurantSelected } = useSelector((state) => state.restaurants);

    const settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        adaptiveHeight: true,        
    };

    function handleKeyPress(e) {
    if (e.key === 'Enter') {
      setQuery(inputValue);
    }
  }

  function handleOpenModal(placeId) {
    setPlaceId(placeId);
    setModalOpened(true);
  }

    return (    
        <Wrapper>
            <Container>
                <Search>
                    <Logo src={logo} alt="Logo do restaurante" />
                    <TextField
                        label='Pesquisar restaurantes'
                        outlined                    
                        trailingIcon={<MaterialIcon role="button" icon="search" />}>
                        <Input 
                            value={inputValue}
                            onKeyPress={handleKeyPress}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                    </TextField>
                    {restaurants.length > 0 ? (
                        <>
                            <CarouselTitle>Na sua área</CarouselTitle>
                            <Carousel { ...settings}>
                              {restaurants.map((restaurant) => (
                               <Card 
                                    key={restaurant.place_id}
                                    photo={restaurant.photos ? restaurant.photos[0].getUrl() : restaurante} 
                                    title={restaurant.name}
                                />
                            ))}                        
                            </Carousel> 
                        </>
                    ) : (
                        <Loader />
                    )}                                      
                </Search>
                {restaurants.map((restaurant) => (
                    <RestaurantCard 
                        onClick={() => handleOpenModal(restaurant.place_id)} 
                        restaurant={restaurant} 
                    />
                ))}                
            </Container>
            <Map query={query} placeId={placeId} />
            <Modal open={modalOpened} onClose={() => setModalOpened(!modalOpened)}>
                {restaurantSelected ? (
                    <>
                        <ModalTitle>Restaurante: {restaurantSelected?.name}</ModalTitle>
                        <ModalContent>Tel.: {restaurantSelected?.formatted_phone_number}</ModalContent>
                        <ModalContent>Endereço: {restaurantSelected?.formatted_address}</ModalContent>
                        <ModalContent>{restaurantSelected?.opening_hours?.open_now ? '>>>Aberto<<<' : '>>>Fechado<<<'}</ModalContent>
                    </>
                ) : (
                    <>
                        <Skeleton width="10px" height="10px" />
                        <Skeleton width="10px" height="10px" />
                        <Skeleton width="10px" height="10px" />
                        <Skeleton width="10px" height="10px" />
                    </>
                )}                    
            </Modal>
        </Wrapper>        
    );
};

export default Home;