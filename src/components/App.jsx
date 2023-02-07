import React, { Component } from 'react';
import css from './App.module.css';
import { nanoid } from 'nanoid';

import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  addContact = ({ name, number }) => {
    const normalizationName = name.toLowerCase();

    let atContactList = false;
    this.state.contacts.forEach(item => {
      if (item.name.toLocaleLowerCase() === normalizationName) {
        alert(`${name} is already in contacts.`);
        atContactList = true;
      }
    });

    if (atContactList) {
      return;
    }

    const newContact = {
      name: name,
      number: number,
      id: nanoid(),
    };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  getContacts = () => {
    const { contacts, filter } = this.state;
    const normalizationFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizationFilter)
    );
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  componentDidMount() {
    const list = localStorage.getItem('contacts-list');
    if (!list) return;

    try {
      this.setState({
        contacts: JSON.parse(list),
      });
    } catch (e) {
      console.error(e);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
      const contactsListStringified = JSON.stringify(this.state.contacts);
      localStorage.setItem('contacts-list', contactsListStringified);
    }
  }

  render() {
    const { filter, contacts } = this.state;
    const visibleContacts = this.getContacts();

    return (
      <div className={css.box}>
        <h2 className={css.title}>Phonebook</h2>
        <ContactForm onSubmit={this.addContact} />
        <h2 className={css.title}>Contacts</h2>
        {contacts.length > 0 ? (
          <>
            <Filter value={filter} onChange={this.changeFilter} />
            <ContactList
              contacts={visibleContacts}
              deleteContact={this.deleteContact}
            />
          </>
        ) : (
          <h2>Contact list is empty</h2>
        )}
      </div>
    );
  }
}

export default App;