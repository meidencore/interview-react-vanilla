import { paginationWithOffset } from "lib/util";
import {
  Container,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";

export default function InteractivePagination({
  currentPage,
  totalPages,
  next,
  prev,
  goto,
}) {
  return (
    <Container className="mt-5" fluid>
      <Pagination size="sm">
        <PaginationItem onClick={() => goto(1)}>
          <PaginationLink first />
        </PaginationItem>
        <PaginationItem onClick={() => prev()}>
          <PaginationLink previous />
        </PaginationItem>{" "}
        {paginationWithOffset(currentPage, totalPages).map((el, index) => {
          return (
            <PaginationItem
              key={index}
              active={currentPage === el ? true : false}
              onClick={() => goto(el)}
            >
              <PaginationLink>{el}</PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem onClick={() => next()}>
          <PaginationLink next />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink last onClick={() => goto(totalPages)} />
        </PaginationItem>
      </Pagination>
    </Container>
  );
}
