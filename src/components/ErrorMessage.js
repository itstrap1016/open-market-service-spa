const ErrorMessage = (message = "에러 메세지") => {
  return `
    <p class="error-message off">${message}</p>
  `;
};

export default ErrorMessage;
