import { useState } from 'react';
import { Button, Upload, message, Collapse } from 'antd';
import './App.css';
import Item from './Item';

const { Panel } = Collapse;

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
      <Collapse>
        <Panel header="操作指南">
          <ul>
          <li>上传的模板文件需要是xml格式的word文档，可以先将word模板转为xml格式文件，每个模板可以添加多个编辑区，每个编辑区可单独生成新的word</li>
            <li>在模板文件中，将需要填充的地方输入"$$"的占位字符，可以设置多个</li>
            <li>点击“上传模板”，上传成功后，点击添加编辑区</li>
            <li>编辑区有一个大的输入框，用来输入填充字符，每一行的字符对应一个"$$"占位符，如果想要输入多条字符，可以按回车键换行</li>
            <li>输入完填充字符后，输入需要生成的文件名（不需要加后缀格式）</li>
            <li>点击生成word，即可下载新的word，新的word中会把之前的“$$“字符替换成自己输入的替换字符</li>
            <li>生成的word是xml格式，需要在打开方式中选择word来打开，打开后可以另存为pdf格式文件</li>
            <li>可以通过“添加编辑区”，针对同一模板配置多份字符集</li>
            <li>可以通过“添加模板”，同时使用多个模板，操作步骤同上</li>
            <li><a href="https://www.awesomescreenshot.com/video/2025879?key=14cf315310bd8998168dc6b67b50fb5f" target="_blank">演示地址</a></li>
          </ul>
        </Panel>
      </Collapse>
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
