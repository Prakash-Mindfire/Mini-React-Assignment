export type FlightComment = {
  id: string;
  flightIata: string;
  flightDate: string;
  text: string;
  createdAt: string;
  updatedAt?: string;
  history: {
    text: string;
    updatedAt: string;
  }[];
};

export type CommentsStore = Record<string, FlightComment[]>;

export type CommentsContextType = {
  getComments: (iata: string, date: string) => FlightComment[];
  addComment: (iata: string, date: string, text: string, createdAt?: string, id?: string) => void;
  updateComment: (
    iata: string,
    date: string,
    id: string,
    newText: string
  ) => void;
  deleteComment: (iata: string, date: string, id: string) => void;
};

export type CommentBoxProps = {
  flightIata: string;
  flightDate: string;
};

export type CommentType = {
  id: string;
  text: string;
  createdAt: string;
  updatedAt?: string;
  history: {
    text: string;
    updatedAt: string;
  }[];
};

export type CommentItemProp = {
  comment: CommentType;
  flightIata: string;
  flightDate: string;
};