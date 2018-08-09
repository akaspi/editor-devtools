(function contentScript() {
  const teamcitySvg = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" width="35" height="35" viewBox="0 0 70 70" xml:space="preserve"><linearGradient id="a" gradientUnits="userSpaceOnUse" x1="1.774" y1="31.273" x2="40.166" y2="31.273"><stop offset="0" stop-color="#905CFB"/><stop offset=".068" stop-color="#776CF9"/><stop offset=".173" stop-color="#5681F7"/><stop offset=".286" stop-color="#3B92F5"/><stop offset=".41" stop-color="#269FF4"/><stop offset=".547" stop-color="#17A9F3"/><stop offset=".711" stop-color="#0FAEF2"/><stop offset=".968" stop-color="#0CB0F2"/></linearGradient><path d="M39.7,47.9l-6.1-34c-0.4-2.4-1.2-4.8-2.7-7.1c-2-3.2-5.2-5.4-8.8-6.3 C7.9-2.9-2.6,11.3,3.6,23.9c0,0,0,0,0,0l14.8,31.7c0.4,1,1,2,1.7,2.9c1.2,1.6,2.8,2.8,4.7,3.4C34.4,64.9,42.1,56.4,39.7,47.9z" fill="url(#a)"/><linearGradient id="b" gradientUnits="userSpaceOnUse" x1="5.311" y1="9.669" x2="69.228" y2="43.866"><stop offset="0" stop-color="#905CFB"/><stop offset=".068" stop-color="#776CF9"/><stop offset=".173" stop-color="#5681F7"/><stop offset=".286" stop-color="#3B92F5"/><stop offset=".41" stop-color="#269FF4"/><stop offset=".547" stop-color="#17A9F3"/><stop offset=".711" stop-color="#0FAEF2"/><stop offset=".968" stop-color="#0CB0F2"/></linearGradient><path d="M67.4,26.5c-1.4-2.2-3.4-3.9-5.7-4.9L25.5,1.7l0,0c-1-0.5-2.1-1-3.3-1.3 C6.7-3.2-4.4,13.8,5.5,27c1.5,2,3.6,3.6,6,4.5L48,47.9c0.8,0.5,1.6,0.8,2.5,1.1C64.5,53.4,75.1,38.6,67.4,26.5z" fill="url(#b)"/><linearGradient id="c" gradientUnits="userSpaceOnUse" x1="-19.284" y1="70.82" x2="55.983" y2="33.186"><stop offset="0" stop-color="#3BEA62"/><stop offset=".117" stop-color="#31DE80"/><stop offset=".302" stop-color="#24CEA8"/><stop offset=".484" stop-color="#1AC1C9"/><stop offset=".659" stop-color="#12B7DF"/><stop offset=".824" stop-color="#0EB2ED"/><stop offset=".968" stop-color="#0CB0F2"/></linearGradient><path d="M67.4,26.5c-1.8-2.8-4.6-4.8-7.9-5.6c-3.5-0.8-6.8-0.5-9.6,0.7L11.4,36.1 c0,0-0.2,0.1-0.6,0.4C0.9,40.4-4,53.3,4,64c1.8,2.4,4.3,4.2,7.1,5c5.3,1.6,10.1,1,14-1.1c0,0,0.1,0,0.1,0l37.6-20.1 c0,0,0,0,0.1-0.1C69.5,43.9,72.6,34.6,67.4,26.5z" fill="url(#c)"/><linearGradient id="d" gradientUnits="userSpaceOnUse" x1="38.944" y1="5.85" x2="5.423" y2="77.509"><stop offset="0" stop-color="#3BEA62"/><stop offset=".094" stop-color="#2FDB87"/><stop offset=".196" stop-color="#24CEA8"/><stop offset=".306" stop-color="#1BC3C3"/><stop offset=".426" stop-color="#14BAD8"/><stop offset=".56" stop-color="#10B5E7"/><stop offset=".719" stop-color="#0DB1EF"/><stop offset=".968" stop-color="#0CB0F2"/></linearGradient><path d="M50.3,12.8c1.2-2.7,1.1-6-0.9-9c-1.1-1.8-2.9-3-4.9-3.5c-4.5-1.1-8.3,1-10.1,4.2L3.5,42 c0,0,0,0,0,0.1C-0.9,47.9-1.6,56.5,4,64c1.8,2.4,4.3,4.2,7.1,5c10.5,3.3,19.3-2.5,22.1-10.8L50.3,12.8z" fill="url(#d)"/><g><path fill="#000" d="M13.4 13.4H56.6V56.6H13.4z"/><path fill="#FFF" d="M17.5 48.5H33.7V51.2H17.5z"/><path fill="#FFF" d="M22.9 22.7L17.5 22.7 17.5 19.1 32.3 19.1 32.3 22.7 26.8 22.7 26.8 37 22.9 37z"/><path d="M32.5,28.1L32.5,28.1c0-5.1,3.8-9.3,9.3-9.3c3.4,0,5.4,1.1,7.1,2.8l-2.5,2.9c-1.4-1.3-2.8-2-4.6-2 c-3,0-5.2,2.5-5.2,5.6V28c0,3.1,2.1,5.6,5.2,5.6c2,0,3.3-0.8,4.7-2.1l2.5,2.5c-1.8,2-3.9,3.2-7.3,3.2 C36.4,37.3,32.5,33.2,32.5,28.1" fill="#FFF"/></g></svg>';
  const getTeamcityUrl = (project, pullRequestNumber) => {
    switch (project) {
      case 'santa':
        return `http://pullrequest-tc.dev.wixpress.com/project.html?projectId=Santa_Santa&branch_Santa_Santa=${pullRequestNumber}/merge`;
      case 'santa-editor':
        return `http://pullrequest-tc.dev.wixpress.com/viewType.html?buildTypeId=MonoRepoTest_SantaEditor&branch_MonoRepoTest=${pullRequestNumber}&tab=buildTypeStatusDiv`;
      case 'santa-core':
        return `http://pullrequest-tc.dev.wixpress.com/viewType.html?buildTypeId=MonoRepoTest_SantaCore&branch_MonoRepoTest=${pullRequestNumber}&tab=buildTypeStatusDiv`;
      default:
        return '';
    }
  };

  const projectRegEx = /https:\/\/github.com\/wix-private\/(.*)\/pull\/(.*)/;
  const [, project, pullRequestNumber] = projectRegEx.exec(location.href);
  const href = getTeamcityUrl(project, pullRequestNumber);

  if (href) {
    const link = document.createElement('a');
    link.style.float = 'left';
    link.style.marginLeft = '10px';
    link.href = href;
    link.target = '_blank';
    link.innerHTML = teamcitySvg;

    const element = document.getElementsByClassName('gh-header-actions')[0];
    element.appendChild(link);
  }
}());
