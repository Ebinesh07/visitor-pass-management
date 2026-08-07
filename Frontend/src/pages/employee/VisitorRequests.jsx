import { useEffect, useMemo, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";

import visitorService from "../../services/visitorService";

import Loader from "../../components/common/Loader";
import PageHeader from "../../components/common/PageHeader";
import SearchBar from "../../components/common/SearchBar";
import EmptyState from "../../components/common/EmptyState";

import VisitorTable from "../../components/visitor/VisitorTable";
import ApprovalModal from "../../components/visitor/ApprovalModal";

const PAGE_SIZE = 8;

const VisitorRequests = () => {
  const [visitors, setVisitors] = useState([]);

  const [loading, setLoading] = useState(true);

  const [buttonLoading, setButtonLoading] =
    useState(false);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const [selectedVisitor, setSelectedVisitor] =
    useState(null);

  const [approveModal, setApproveModal] =
    useState(false);

  const [rejectModal, setRejectModal] =
    useState(false);

  const loadVisitors = async () => {
    try {
      setLoading(true);

      const data =
        await visitorService.getAllVisitors();

      const pendingVisitors =
        (data.visitors || []).filter(
          (visitor) =>
            visitor.status === "Pending"
        );

      setVisitors(pendingVisitors);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load visitor requests."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVisitors();
  }, []);

  const filteredVisitors = useMemo(() => {
    return visitors.filter((visitor) =>
      `
      ${visitor.visitorName}
      ${visitor.phone}
      ${visitor.company}
      ${visitor.employee?.name}
      `
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [visitors, search]);

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

  const openApproveModal = (
    visitor
  ) => {
    setSelectedVisitor(visitor);
    setApproveModal(true);
  };

  const openRejectModal = (
    visitor
  ) => {
    setSelectedVisitor(visitor);
    setRejectModal(true);
  };
    const approveVisitor = async (remarks) => {
    try {
      setButtonLoading(true);

      await visitorService.approveVisitor(
        selectedVisitor._id,
        remarks
      );

      toast.success(
        "Visitor Approved Successfully"
      );

      setApproveModal(false);

      setSelectedVisitor(null);

      loadVisitors();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Approval Failed"
      );
    } finally {
      setButtonLoading(false);
    }
  };

  const rejectVisitor = async (remarks) => {
    try {
      setButtonLoading(true);

      await visitorService.rejectVisitor(
        selectedVisitor._id,
        remarks
      );

      toast.success(
        "Visitor Rejected Successfully"
      );

      setRejectModal(false);

      setSelectedVisitor(null);

      loadVisitors();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Rejection Failed"
      );
    } finally {
      setButtonLoading(false);
    }
  };

  if (loading) {
    return <Loader text="Loading Visitor Requests..." />;
  }

  return (
    <>
      <PageHeader
        title="Visitor Requests"
        subtitle="Approve or Reject Pending Visitor Requests"
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
                title="No Pending Requests"
                description="There are no visitor requests waiting for approval."
              />

            ) : (

<VisitorTable
  visitors={paginatedVisitors}
  role="employee"
  onApprove={openApproveModal}
  onReject={openRejectModal}
  onCheckIn={() => {}}
  onCheckOut={() => {}}
  onCancel={() => {}}
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
            {/* Approve Modal */}
      <ApprovalModal
        show={approveModal}
        handleClose={() => {
          setApproveModal(false);
          setSelectedVisitor(null);
        }}
        handleSubmit={approveVisitor}
        title="Approve Visitor"
        buttonText="Approve"
        buttonVariant="success"
        loading={buttonLoading}
      />

      {/* Reject Modal */}
      <ApprovalModal
        show={rejectModal}
        handleClose={() => {
          setRejectModal(false);
          setSelectedVisitor(null);
        }}
        handleSubmit={rejectVisitor}
        title="Reject Visitor"
        buttonText="Reject"
        buttonVariant="danger"
        loading={buttonLoading}
      />
    </>
  );
};

export default VisitorRequests;