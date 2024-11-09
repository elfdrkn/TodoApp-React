import { useState } from "react";

// Sample products to initialize the state
const products = [
    {id:1, title: "Learn JavaScript",  completed: true}, // Task already completed
    {id:2, title: "Learn React",  completed: false}, // Task is not completed
    {id:3, title: "Have a life!",  completed: false}, // Another task not completed
]

export default function TodoApp () {
    // State to manage todo items and filter status
    const [items, setItems] = useState(products); // Holds the list of todo items
    const [filter, setFilter] = useState("all"); // Keeps track of the current filter ('all', 'active', or 'completed')

    // Function to handle adding a new item
    function handleAddItem(item) {
        setItems(prevItems => [...prevItems, item]); // Add new item to the list
    }

    // Function to handle deleting an item by its id
    function handleDeleteItem(id) {
        setItems((items) => items.filter(item => item.id !== id) ) // Filter out the item with the given id
    }

    // Function to update the status of an item (completed or not)
    function handleUpdateItem(id) {
        setItems(items => 
            items.map(item => 
                item.id === id ? {...item, completed: !item.completed} : item )); // Toggle 'completed' status
    }

    // Function to clear all completed items
    function handleClearCompleted() {
        setItems(items => items.filter(item => !item.completed)); // Remove all items that are completed
    }

    // Function to handle the change in the filter (all, active, completed)
    function handleFilterChange(newFilter) {
        setFilter(newFilter); // Update the filter to the new filter
    }

    // Filter items based on the current filter state
    const filteredItems = items.filter(item => {
        if (filter === "all") return true;
        if (filter === "active") return !item.completed;
        if (filter === "completed") return item.completed;
        return true;
    });

    return (
        <div className="container">
            <Header />
            <Form onAddItem={handleAddItem} /> {/* Form for adding a new task */}
            <List items={filteredItems} onDeleteItem={handleDeleteItem} onUpdateItem={handleUpdateItem} />
            <Footer items={items} filter={filter} onFilterChange={handleFilterChange} onClearCompleted={handleClearCompleted} />
        </div>
    )
}

// Header component with title
function Header () {
    return <h1 className="red-light">todos</h1>;
}

// Form component for adding new todo items
function Form( {onAddItem}) {
    const [itemName, setItemName ] = useState("");
 
    // Handle form submission and add new item
    function handleFormSubmit(e) {
        e.preventDefault(); // Prevent form default behavior

        // Create a new item
        const product = {
            id: Date.now(),  // Use timestamp as a unique id
            title: itemName, 
            completed: false,
        };

        onAddItem(product); // Add the new item to the list

        setItemName("");  // Reset the input field
    }
    
 
    return (
        <form className="new-todo" onSubmit={handleFormSubmit}>
            <input 
            type="text" 
            placeholder="What needs to be done?" 
            name="itemName" 
            value={itemName} onChange={(e) => setItemName(e.target.value) } />  
            <button type="submit">Add</button> {/* Button to submit new item */}
        </form>
    );
}

// List component to display todo items
function List( { items, onDeleteItem, onUpdateItem }) {
    return (
        <>        
        {
            items.length > 0 ? (
                <ul className="todo-list">
            { items.map((p, index) => (
                <ListItem 
                item={p} key={index} onDeleteItem={onDeleteItem} onUpdateItem={onUpdateItem} />
                ))}
                 </ul>
            ) : (
                <p>Nothing to do!</p>
            )
        }
        </>        
    );
}

// ListItem component for each todo item
function ListItem({ item, onDeleteItem, onUpdateItem }) {
    return ( 
        <li className="list-item">
            <div className="left-content">
                <input 
                    type="checkbox" 
                    checked={item.completed}
                    onChange={() => onUpdateItem(item.id)}
                />
                <span style={item.completed ? { textDecoration: "line-through" } : {}}>
                    {item.title}
                </span>
            </div>
            <button className="delete-button" onClick={() => onDeleteItem(item.id)}>X</button>
        </li>
    );
}

// Footer component that shows the count of uncompleted tasks and provides filter options
function Footer({ items, filter, onFilterChange, onClearCompleted }) {
    // Calculate the count of uncompleted tasks
    const uncompletedCount = items.filter(item => !item.completed).length;

    return (
        <div className="button-container">
            <div>
                <p> {uncompletedCount} item{uncompletedCount !== 1 ? "s" : ""} left</p>
            </div>
            <div className="filters">
                <button className={filter === "all" ? "selected" : ""}
                onClick={() => onFilterChange("all")}
                >All
                </button>
                <button className={filter === "active" ? "selected" : ""} 
                onClick={() => onFilterChange("active")} >Active
                </button>
                <button className={filter === "completed" ? "selected" : ""}
                onClick={() => onFilterChange("completed")}>Completed
                </button>
            </div>
            <div>
                <button onClick={onClearCompleted}>Clear completed</button>
            </div>
        </div>
        
    );
}

