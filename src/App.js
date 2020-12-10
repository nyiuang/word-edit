import { useState } from 'react';
import { Button, Upload, message } from 'antd';
import './App.css';
import Item from './Item';

let itemsCount = 1;

function App() {
  const maxCount = 10;
  const [items, setItems] = useState([itemsCount]);

  const handleAddItem = () => {
    if (items.length === maxCount) {
      message.info(`最多创建${maxCount}个模板`);
      return;
    }
    itemsCount++;
    const newItems = items.slice(0);
    newItems.push(itemsCount);
    setItems(newItems);
  }

  const handleDeleteItem = (id) => {
    const newItems = items.slice(0).filter(v => v !== id);
    setItems(newItems);
  }

  return (
    <div className="container">
      <div className="h1">word编辑</div>
      <div className="toolbar">
        <Button type="primary" onClick={handleAddItem}>添加新模板</Button>
      </div>
      <div className="list">
        {items.map((id) => {
          return (
            <Item key={id} id={id} onDelete={handleDeleteItem}></Item>
          )
        })}
      </div>
    </div>
  );
}

export default App;
