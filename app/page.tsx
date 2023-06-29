import { ProjectInterface } from '@/common.types';
import ProjectCard from '@/components/ProjectCard';
import { fetchAllProjects } from '@/lib/actions'
import React from 'react'

type ProjectSearch = {
  projectSearch: {
    edges: { node: ProjectInterface }[];
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  },
}

const Home = async () => {

  const data = await fetchAllProjects() as ProjectSearch

  const projectsToDisplay = data?.projectSearch?.edges || [];

  if (projectsToDisplay.length === 0) {
    return (
      <section className="flexStart flex-col paddings">
        {/* <Categories /> */}

        <p className="no-result-text text-center">No projects found, go create some first.</p>
      </section>
    )
  }
  return (
  <section className="flexStart flex-col paddings mb-16">
   {/*  <Categories /> */}

    <section className="projects-grid">
      {projectsToDisplay.map(({ node }: { node: ProjectInterface }) => (
        <ProjectCard
          key={`${node?.id}`}
          id={node?.id}
          image={node?.image}
          title={node?.title}
          name={node?.createdBy.name}
          avatarUrl={node?.createdBy.avatarUrl}
          userId={node?.createdBy.id}
        />
      ))}
    </section>

  {/*   <LoadMore
      startCursor={data?.projectSearch?.pageInfo?.startCursor}
      endCursor={data?.projectSearch?.pageInfo?.endCursor}
      hasPreviousPage={data?.projectSearch?.pageInfo?.hasPreviousPage}
      hasNextPage={data?.projectSearch?.pageInfo.hasNextPage}
    /> */}
  </section>
  )
};

export default Home;