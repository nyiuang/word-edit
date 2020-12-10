import React, { useState, useRef } from 'react';
import { message, Input, Button, Popconfirm } from 'antd';
import './item.css'

const TextArea = Input.TextArea;

let editItemsCount = 1;

const Item = (props) => {
    const [fileName, setFileName] = useState('');
    const [editItems, setEditItems] = useState([]);
    const [xml, setXML] = useState('');
    const uploadBtnRef = useRef();

    const handleChange = (e) => {
        var file = e.target.files[0];//获取文件
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function (e) {
            const xmlStr = e.target.result;
            setXML(xmlStr);
            setFileName(file.name || '');
            message.success('上传成功');
        }
        reader.onerror = function () {
            message.error('上传失败');
            setXML('');
            setFileName('')
        }
    }

    const handleUpload = () => {
        if (uploadBtnRef.current) {
            const input = uploadBtnRef.current.querySelector('input');
            input.click();
        }
    }

    // 添加编辑区
    const handleAddEditItem = () => {
        editItemsCount++;
        const newItems = editItems.slice(0);
        newItems.push({
            id: editItemsCount,
            value: '',
            fileName: '',
        });
        setEditItems(newItems);
    }

    // 删除编辑区
    const handleDeleteEditItem = (id) => {
        const newItems = editItems.slice(0).filter(v => v.id !== id);
        setEditItems(newItems);
    }

    // 删除模板
    const handleDeleteItem = () => {
        props.onDelete && props.onDelete(props.id)
    }

    // 生成word
    const handleGenerate = (id) => {
        if (!xml) {
            message.info('请先上传模板');
            return;
        };
        const item = editItems.find(v => v.id === id);
        if (!item) return;
        if (item.fileName.trim() === '') {
            message.info('请输入文件名称');
            return;
        }

        const arr = item.value.split('\n');
        const newXML = xml.replace(/\$\$/g, function () {
            if (arr.length) {
                const val = arr.shift();
                return val;
            }
            return '';
        })
        const blob = new Blob([newXML], { type: 'text/xml' })
        var a = document.createElement("a");
        a.href = window.URL.createObjectURL(blob);
        a.download = `${item.fileName.trim()}.xml`;
        a.textContent = "Download";
        document.body.appendChild(a);
        a.click();
        a.remove();
    }

    const handleValueChange = (e, id) => {
        const newItems = editItems.slice(0);
        const item = newItems.find(v => v.id === id);
        if (item) {
            item.value = e.target.value;
        }
        setEditItems(newItems);
    }

    const handleFileNameChange = (e, id) => {
        const newItems = editItems.slice(0);
        const item = newItems.find(v => v.id === id);
        if (item) {
            item.fileName = e.target.value;
        }
        setEditItems(newItems);
    }



    return (
        <div className="item">
            <div className="top">
                <div>
                    <Button onClick={handleUpload} ref={uploadBtnRef}>
                        上传模板
                    <input type="file" onChange={handleChange} className="hidden" />
                    </Button>
                    <span>{fileName}</span>
                </div>
                <div className="item-toolbar">
                    <Button type="primary" className="btn" onClick={handleAddEditItem}>添加编辑区</Button>
                    <Popconfirm title="确认删除?" onConfirm={handleDeleteItem}>
                        <Button type="primary" danger className="btn">删除模板</Button>
                    </Popconfirm>

                </div>
            </div>
            <div className="edit-list">
                {editItems.map(item => {
                    return (
                        <div key={item.id} className="edit-item">
                            <TextArea autoSize={{ minRows: 5 }} value={item.value} onChange={(e) => handleValueChange(e, item.id)}></TextArea>
                            <div className="edit-item-input">
                                <Input prefix="文件名" value={item.fileName} onChange={(e) => handleFileNameChange(e, item.id)}></Input>
                            </div>
                            <div className="edit-item-btns">
                                <Popconfirm title="确认删除?" onConfirm={() => handleDeleteEditItem(item.id)}>
                                    <Button type="primary" danger className="btn">删除</Button>
                                </Popconfirm>
                                <Button type="primary" className="btn" onClick={() => handleGenerate(item.id)}>生成word</Button>
                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}

export default Item;