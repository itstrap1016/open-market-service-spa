const TabBtns = (name1 = "버튼", name2 = "버튼") => {
  return `
    <ul class="common-btns-list">
        <li>
            <button class="active">${name1}</button>
        </li>
        <li>
            <button>${name2}</button>
        </li>
    </ul>
    `;
};

export default TabBtns;
