import { useEffect, useMemo, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { toast, ToastContainer } from "react-toastify";

import employeeService from "../../services/employeeService";

import Loader from "../../components/common/Loader";
import PageHeader from "../../components/common/PageHeader";
import SearchBar from "../../components/common/SearchBar";
import EmptyState from "../../components/common/EmptyState";
import ConfirmModal from "../../components/common/ConfirmModal";

import EmployeeTable from "../../components/employee/EmployeeTable";
import EmployeeModal from "../../components/employee/EmployeeModal";

const PAGE_SIZE = 8;

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteEmployee, setDeleteEmployee] = useState(null);

  const [page, setPage] = useState(1);

  const loadEmployees = async () => {
    try {
      setLoading(true);

      const data =
        await employeeService.getAllEmployees();

      setEmployees(data.employees || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to load employees."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) =>
      `
      ${employee.employeeId}
      ${employee.name}
      ${employee.email}
      ${employee.department}
      ${employee.designation}
      `
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [employees, search]);

  const totalPages = Math.ceil(
    filteredEmployees.length / PAGE_SIZE
  );

  const paginatedEmployees = filteredEmployees.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  useEffect(() => {
    setPage(1);
  }, [search]);

  const openAddModal = () => {
    setSelectedEmployee(null);
    setShowModal(true);
  };

  const openEditModal = (employee) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  const saveEmployee = async (formData) => {
    try {
      setButtonLoading(true);

      if (selectedEmployee) {
        await employeeService.updateEmployee(
          selectedEmployee._id,
          formData
        );

        toast.success(
          "Employee Updated Successfully"
        );
      } else {
        await employeeService.createEmployee(
          formData
        );

        toast.success(
          "Employee Added Successfully"
        );
      }

      setShowModal(false);

      loadEmployees();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Operation Failed"
      );
    } finally {
      setButtonLoading(false);
    }
  };

  const openDeleteModal = (employee) => {
    setDeleteEmployee(employee);
    setDeleteModal(true);
  };

  const deleteSelectedEmployee =
    async () => {
      try {
        setButtonLoading(true);

        await employeeService.deleteEmployee(
          deleteEmployee._id
        );

        toast.success(
          "Employee Deleted Successfully"
        );

        setDeleteModal(false);

        loadEmployees();
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Delete Failed"
        );
      } finally {
        setButtonLoading(false);
      }
    };

  if (loading) {
    return (
      <Loader text="Loading Employees..." />
    );
  }

  return (
    <>
      <ToastContainer />

      <PageHeader
        title="Employees"
        subtitle="Manage Company Employees"
        buttonText="Add Employee"
        buttonIcon={<FaPlus />}
        onClick={openAddModal}
      />

      <Card className="border-0 shadow-sm">

        <Card.Body>

          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search Employee..."
          />

          <div className="mt-4">

            {filteredEmployees.length === 0 ? (
              <EmptyState
                title="No Employees Found"
                description="Try changing your search keyword."
              />
            ) : (
              <EmployeeTable
                employees={
                  paginatedEmployees
                }
                onEdit={openEditModal}
                onDelete={
                  openDeleteModal
                }
              />
            )}

          </div>

          {totalPages > 1 && (

            <div className="d-flex justify-content-end gap-2 mt-4">

              <Button
                variant="outline-primary"
                disabled={page === 1}
                onClick={() =>
                  setPage(page - 1)
                }
              >
                Previous
              </Button>

              <Button disabled>
                {page} / {totalPages}
              </Button>

              <Button
                variant="outline-primary"
                disabled={
                  page === totalPages
                }
                onClick={() =>
                  setPage(page + 1)
                }
              >
                Next
              </Button>

            </div>

          )}

        </Card.Body>

      </Card>

      <EmployeeModal
        show={showModal}
        handleClose={() =>
          setShowModal(false)
        }
        handleSubmit={saveEmployee}
        loading={buttonLoading}
        selectedEmployee={
          selectedEmployee
        }
      />

      <ConfirmModal
        show={deleteModal}
        title="Delete Employee"
        message={`Delete ${deleteEmployee?.name}?`}
        confirmText="Delete"
        confirmVariant="danger"
        loading={buttonLoading}
        onClose={() =>
          setDeleteModal(false)
        }
        onConfirm={
          deleteSelectedEmployee
        }
      />
    </>
  );
};

export default Employee;