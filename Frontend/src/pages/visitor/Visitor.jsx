import { useEffect, useMemo, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";

import visitorService from "../../services/visitorService";
import employeeService from "../../services/employeeService";

import Loader from "../../components/common/Loader";
import PageHeader from "../../components/common/PageHeader";
import SearchBar from "../../components/common/SearchBar";
import EmptyState from "../../components/common/EmptyState";

import VisitorTable from "../../components/visitor/VisitorTable";
import VisitorModal from "../../components/visitor/VisitorModal";

import { useAuth } from "../../context/AuthContext";

const PAGE_SIZE = 8;

const Visitor = () => {
  const [visitors, setVisitors] = useState([]);
  const [employees, setEmployees] = useState([]);

  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const { user } = useAuth();

  const loadData = async () => {
    try {
      setLoading(true);

      const visitorData =
        await visitorService.getAllVisitors();

      const employeeData =
        await employeeService.getAllEmployees();

      setVisitors(visitorData.visitors || []);

      setEmployees(employeeData.employees || []);

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
          "Failed to load visitors."
      );

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredVisitors = useMemo(() => {
    return visitors.filter((visitor) =>
      `
      ${visitor.visitorName}
      ${visitor.phone}
      ${visitor.company}
      ${visitor.employee?.name}
      ${visitor.status}
      `
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search, visitors]);

  const totalPages = Math.ceil(
    filteredVisitors.length / PAGE_SIZE
  );

  const paginatedVisitors =
    filteredVisitors.slice(
      (page - 1) * PAGE_SIZE,
      page * PAGE_SIZE
    );

  useEffect(() => {
    setPage(1);
  }, [search]);

  const registerVisitor = async (formData) => {
    try {

      setBtnLoading(true);

      await visitorService.registerVisitor(
        formData
      );

      toast.success(
        "Visitor Registered Successfully"
      );

      setShowModal(false);

      loadData();

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
          "Registration Failed"
      );

    } finally {

      setBtnLoading(false);

    }
  };

  const approve = async (visitor) => {
    await visitorService.approveVisitor(
      visitor._id,
      "Approved"
    );

    toast.success("Visitor Approved");

    loadData();
  };

  const reject = async (visitor) => {
    await visitorService.rejectVisitor(
      visitor._id,
      "Rejected"
    );

    toast.success("Visitor Rejected");

    loadData();
  };

  const checkIn = async (visitor) => {
    await visitorService.checkInVisitor(
      visitor._id
    );

    toast.success("Checked In");

    loadData();
  };

  const checkOut = async (visitor) => {
    await visitorService.checkOutVisitor(
      visitor._id
    );

    toast.success("Checked Out");

    loadData();
  };

  const cancel = async (visitor) => {
    await visitorService.cancelVisitor(
      visitor._id
    );

    toast.success("Visitor Cancelled");

    loadData();
  };

  if (loading) {
    return (
      <Loader text="Loading Visitors..." />
    );
  }

  return (
    <>
      <ToastContainer />

      <PageHeader
        title="Visitors"
        subtitle="Visitor Registration & Approval"
        buttonText="Register Visitor"
        buttonIcon={<FaPlus />}
        onClick={() => setShowModal(true)}
      />

      <Card className="border-0 shadow-sm">

        <Card.Body>

          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search Visitor..."
          />

          <div className="mt-4">

            {filteredVisitors.length === 0 ? (

              <EmptyState
                title="No Visitors Found"
                description="There are no matching visitor records."
              />

            ) : (
<VisitorTable
  visitors={paginatedVisitors}
  role={user?.role}
  onApprove={approve}
  onReject={reject}
  onCheckIn={checkIn}
  onCheckOut={checkOut}
  onCancel={cancel}
/>

            )}

          </div>

          {totalPages > 1 && (

            <div className="pagination-wrapper">

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

      <VisitorModal
        show={showModal}
        handleClose={() =>
          setShowModal(false)
        }
        handleSubmit={registerVisitor}
        employees={employees}
        loading={btnLoading}
      />

    </>
  );
};

export default Visitor;