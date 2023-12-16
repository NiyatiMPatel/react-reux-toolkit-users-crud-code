import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { usersList, removeUser } from '../../redux/userAction'
import { showModal, closeModal } from '../../redux/userSlice'
import { Input, Table } from 'antd';
import Modal from '../../modal/Modal'
import LoadingSpinner from '../../UI/LoadingSpinner'
import styles from './Users.module.css'


const ListUserTable = () => {
  const [userId, setUserId] = useState()
  // ====== TABLE GLOBAL SEARCH ======= /
  const [searchText, setSearchText] = useState('')
  // ======== TABLE PAGINATION  =========== //
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  // ======== TABLE GENDER FILTER AND NAME SORT ========= //
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});

  const dispatch = useDispatch()

  // ========= FETCH USERS FROM API THROUGH REDUX TOOLKIT ========= //
  useEffect(() => {
    dispatch(usersList())
  }, [dispatch])

  // ========= READ STATE VALES FROM REDUX TOOLKIT STORE ============ //
  const status = useSelector((state) => (state.users.status))
  const users = useSelector((state) => (state.users.users))
  const modalState = useSelector((state) => (state.users.modalIsOpen))

  // ============ STORE FETCHED USERS LIST INTO COMPONENT USE_STATE ======== //
  // useEffect(() => {
  //   setListUsers(users)
  // }, [users])

  // ============= ANTD TABLE CHANGE HANDLER ============ //
  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  // ========= DELETE USER BUTTON CLICK HANDLER - OPEN MODAL AND PASS USER ID TO IT ==== //
  const deleteModalHandler = (id) => {
    setUserId(id);
    dispatch(showModal());
  }

  // ======= CLOSE MODAL HANDLER TO BE PASSED AS PROPS ========= //
  const closeModalHandler = () => {
    dispatch(closeModal());
  }

  // ====== DELETE USER HANDLER PASSED TO MODAL AS PROPS ===== //
  const confirmHandler = () => {
    dispatch(removeUser(userId)).then(() => {
      dispatch(usersList());
      dispatch(closeModal());
    });
  }

  // ============ ANTD TABLE COLUMNS CONFIGURATION =========== //
  const columns = [
    //  NAME
    {
      title: 'Name',
      dataIndex: 'firstName',
      key: 'name',
      render: function address(text, record) {
        return (
          <>
            {record.firstName} {record.lastName}
          </>
        )
      },
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return String(record?.firstName).toLowerCase().includes(value.toLowerCase()) ||
          String(record?.lastName).toLowerCase().includes(value.toLowerCase())
      },
      sorter: (a, b) => (a?.firstName.localeCompare(b?.firstName)),
      sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
    },

    // AGE
    {
      title: 'Age',
      dataIndex: 'age',
    },

    //  GENDER
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      filters: [
        {
          text: 'Male',
          value: 'Male',
        },
        {
          text: 'Female',
          value: 'Female',
        },
      ],
      filteredValue: filteredInfo.gender || null,
      onFilter: (value, record) => record?.gender.includes(value),
    },

    //  EMAIL
    {
      title: 'Email',
      dataIndex: 'email',
    },

    //  CONTACT
    {
      title: 'Contact',
      dataIndex: 'contact',
    },

    // EDIT DELETE ACTION BUTTONS
    {
      title: 'Action',
      dataIndex: 'id',
      render: function editUser(id) {
        return (
          <div className={styles.actionsCon}>

            {/* EDIT USER LINK */}
            <Link to={`edit-user/${id}`} className={styles['actions_link']}>Edit User</Link>

            {/* DELETE USER BUTTON */}
            <button onClick={() => deleteModalHandler(id)} className={styles['actions_btn']}>
              Delete User
            </button>
          </div>
        )

      }
    },
  ];

  return (
    <>
      {/* IF MODAL STATE = TRUE THEN ONLY SHOW MODAL ON THE SCREEN */}
      {modalState && <Modal onCancel={closeModalHandler} onConfirm={confirmHandler} title='Delete User' message='Are you sure want to delete user?' />}

      {/* IF STATUS = PENDING THEN ONLY SHOW LOADING SPINNER ON THE SCREEN */}
      {status === 'pending' ? <LoadingSpinner /> : (

        // OR ELSE SHOW THE USERS LIST
        <>
          <Input.Search
            className={styles.search}
            placeholder='Search name here...'
            onSearch={(value) => (setSearchText(value))}
            onChange={(e) => (setSearchText(e.target.value))} />

          <Table
            columns={columns}
            dataSource={users}
            rowKey='id'
            onChange={handleChange}
            pagination={{
              current: page,
              pageSize: pageSize,
              onChange: (page, pageSize) => {
                setPage(page);
                setPageSize(pageSize)
              }
            }}
          />
        </>
      )}
    </>
  )
}

export default ListUserTable;