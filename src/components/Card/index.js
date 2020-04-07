import React, { useRef, useContext } from 'react';
import { useDrag, useDrop } from 'react-dnd';
//Importando o contexto do Board para utilizar as informações de mudança de index do card na lista.
import BoardContext from '../Board/context'

import { Container, Label } from './styles';

export default function Card({ data, index, listIndex }) {
    const ref = useRef();
    const { move } = useContext(BoardContext);

    //Função para verificar se o card está sendo arrastado, será usada para estilização.
    const [{isDragging}, dragRef] = useDrag({
      item: { 
        type: 'CARD',
        index,
        listIndex
      },
      collect: monitor => ({
        isDragging: monitor.isDragging()
      }),
    });

    //Função para calcular onde o card deverá ser colocado após o arraste.
    const [, dropRef] = useDrop({
      accept: 'CARD',
      hover(item, monitor) {
        const draggedListIndex = item.listIndex;
        const targetListIndex = listIndex;
        const draggedIndex = item.index;
        const targetIndex = index;

        //Verificando se o card que foi selecionado não foi movido.
        if (draggedIndex === targetIndex && draggedListIndex === targetListIndex){
          return;
        }

        //Cálculo da posição do centro do elemento do card
        const targetSize = ref.current.getBoundingClientRect();
        const targetCenter = (targetSize.bottom - targetSize.top)/2;
        //Cálculo da distância percorrida pelo card no eixo y
        const draggedOffset = monitor.getClientOffset();
        const draggedTop = draggedOffset.y - targetSize.top;

        //Verificando se o card, após arrastado, está permanecendo no mesmo local.
        if (draggedIndex < targetIndex && draggedTop < targetCenter ) {
          return;
        }
        if (draggedIndex > targetIndex && draggedTop > targetCenter ) {
          return;
        }

        move(draggedListIndex, targetListIndex, draggedIndex, targetIndex);

        item.index = targetIndex;
        item.listIndex = targetListIndex;

      }
    })

    //Hook utilizado para que possamos passar duas referências para o componente Container.
    dragRef(dropRef(ref))

    return(
      <Container ref={ref} isDragging={isDragging} >
        <header>
          {data.labels.map(label => <Label key={label} color={label} />)}
        </header>
        <p>
          { data.content }
        </p>
        { data.user && (
          <img src={ data.user } alt=""/>
        )}
      </Container>
    )
}