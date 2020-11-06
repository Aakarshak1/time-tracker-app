import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import {
  CREATE_TASK,
  CREATE_TASK_WITH_EXISTING_TAG,
  CREATE_TAG,
} from '../graphQL/mutation';
import { GET_ALL_TASKS, GET_ALL_TAGS } from '../graphQL/queries';
import { CreateTaskContainer, TaskTitleInput } from '../styles/style';
import { toast } from 'react-toastify';
import useOnclickOutside from 'react-cool-onclickoutside';
import { Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import LabelIcon from '@material-ui/icons/Label';

const mutationUpdateFunction = (cache, response) => {
  const createdTask = {
    ...response.data.insert_tasks_one,
  };
  const { tasks } = cache.readQuery({
    query: GET_ALL_TASKS,
  });
  cache.writeQuery({
    query: GET_ALL_TASKS,
    data: {
      tasks: [...tasks, createdTask],
    },
  });
};

const CreateTask = () => {
  const [title, setTitle] = useState('');
  const [shouldShowTags, setShowTags] = useState(false);
  const [selectedTag, selectTag] = useState(null);
  const ref = useOnclickOutside(() => {
    selectTag(null);
    setShowTags(false);
  });
  const [createTask] = useMutation(CREATE_TASK, {
    update: (cache, response) => {
      mutationUpdateFunction(cache, response);
    },
    onCompleted: (data) => {
      setTitle('');
      selectTag(null);
      toast('Task Added', {
        type: 'success',
      });
    },
    onError: (e) => {
      console.log({ e });
      toast('Something went wrong', {
        type: 'error',
      });
    },
  });
  const [createTaskWithExistingTag] = useMutation(
    CREATE_TASK_WITH_EXISTING_TAG,
    {
      update: (cache, response) => {
        mutationUpdateFunction(cache, response);
      },
      onCompleted: (data) => {
        setTitle('');
        selectTag(null);
        toast('Completed!', {
          type: 'success',
        });
      },
      onError: (e) => {
        console.log({ e });
        toast('Something went wrong', {
          type: 'error',
        });
      },
    }
  );
  const [createTag] = useMutation(CREATE_TAG, {
    update: (cache, response) => {
      const { tags } = cache.readQuery({
        query: GET_ALL_TAGS,
      });
      cache.writeQuery({
        query: GET_ALL_TAGS,
        data: {
          tags: [...tags, response.data.insert_tags_one],
        },
      });
      console.log(response.data);
      selectTag(response.data.insert_tags_one.id);
      setCreateTagMode(false);
      setTagTitle('');
    },
    onError: (e) => {
      toast('Error while creating tag', {
        type: 'error',
      });
      console.log({ e });
    },
  });
  const { loading: tagsLoading, error: tagsError, data: tagsData } = useQuery(
    GET_ALL_TAGS
  );
  const [createTagMode, setCreateTagMode] = useState(false);
  const [tagTitle, setTagTitle] = useState('');

  const addTag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.dir(e.target.previousSibling.value);
    console.log(tagTitle);
    createTag({
      variables: {
        name: tagTitle,
      },
    });
  };
  return (
    <CreateTaskContainer
      onSubmit={(e) => {
        e.preventDefault();
        if (selectedTag) {
          createTaskWithExistingTag({
            variables: {
              title,
              tag_id: selectedTag,
            },
          });
        } else {
          createTask({
            variables: {
              title,
            },
          });
        }
      }}
      ref={ref}
    >
      <TaskTitleInput
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onFocus={() => setShowTags(true)}
        placeholder="I want to..."
      />
      {tagsLoading && 'Loading tags'}
      {tagsError && JSON.stringify({ tagsError })}
      {shouldShowTags && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <div>
            {tagsData &&
              tagsData.tags.map((tag) => (
                <button
                  type="button"
                  style={{
                    color: '#fff',
                    background: selectedTag === tag.id ? 'red' : '#dc7070',
                    padding: '4px',
                    borderRadius: '4px',
                    margin: '4px',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    selectTag(tag.id);
                  }}
                  onBlur={() => setCreateTagMode(false)}
                >
                  {tag.name}
                </button>
              ))}
            {!createTagMode ? (
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setCreateTagMode(true)}
                startIcon={<LabelIcon />}
              >
                Add Tag
              </Button>
            ) : (
              <div>
                <input
                  type="text"
                  value={tagTitle}
                  onChange={(e) => setTagTitle(e.target.value)}
                  placeholder="Enter tag name"
                  autoFocus
                  style={{
                    width: '120px',
                    borderRadius: '2px',
                    border: 'none',
                    background: '#fff',
                    boxShadow: '0px 0px 0.5px 0px',
                  }}
                />
                <button type="submit" title="add" onClick={addTag}>
                  +
                </button>
              </div>
            )}
          </div>
          <div style={{ textAlign: 'right' }}>
            <Button
              variant="contained"
              color="primary"
              disabled={title === ''}
              startIcon={<SaveIcon />}
              type="submit"
            >
              SAVE
            </Button>
          </div>
        </div>
      )}
    </CreateTaskContainer>
  );
};

export default CreateTask;
